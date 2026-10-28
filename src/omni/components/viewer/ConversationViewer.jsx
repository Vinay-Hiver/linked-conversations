import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../../components/Button';
import { Icon } from '../../../icons/Icon';
import ConversationDetail from '../ConversationDetail';
import ChatPanel from '../ChatPanel/ChatPanel';
import SlackChatPanel from '../SlackChatPanel/SlackChatPanel';
import { CallDetail, TRANSCRIPT_DELAY_MS } from '../voice/VoiceCallView';
import LinkedRightPanel from '../link/LinkedRightPanel';
import { conversationById } from '../../data/conversationIndex';
import { conversationsData } from '../../data/emailConversations';
import { CHANNEL_CHATS } from '../../data/channelChats';
import { VOICE_CALLS } from '../../data/voiceCalls';
import { ConversationViewerContext } from './viewerContext';
import './ConversationViewer.css';
import '../modalMotion.css';
import { useModalExit } from '../modalMotion';

// The conversation viewer (Figma: Delete › 6018:50256) works like a browser window:
// - Clicking a linked conversation card opens the viewer with that conversation in a tab.
// - Clicking a linked card inside the viewer opens it in a new tab (or switches to it if open).
// - There is no "new tab" button; tabs only come from linked cards.
// Each tab shows the conversation and its own right panel, Linked conversations included.
// Every channel opens here, each with its own conversation view (the same one the
// inbox uses) and its right panel.

/** The source record for a conversation, whatever its channel. */
function findSource(item) {
  if (!item) return null;
  if (item.channel === 'email') return conversationsData.find((c) => String(c.id) === item.id);
  if (item.channel === 'voice') return VOICE_CALLS.find((c) => c.id === item.id);
  return (CHANNEL_CHATS[item.inbox] || []).find((c) => c.id === item.id);
}

/** A voice call in a tab: an ongoing call can be ended here, like in the inbox. */
function VoiceTab({ call, panel }) {
  const [ended, setEnded] = React.useState(call.status === 'ended');
  const [ready, setReady] = React.useState(call.status === 'ended');
  React.useEffect(() => {
    if (!ended || ready) return undefined;
    const t = setTimeout(() => setReady(true), TRANSCRIPT_DELAY_MS);
    return () => clearTimeout(t);
  }, [ended, ready]);
  return (
    <div className="active-call-page cv-voice">
      <CallDetail call={call} isEnded={ended} isTranscriptReady={ready} onEndCall={() => setEnded(true)} />
      {panel}
    </div>
  );
}

function ConversationTab({ item }) {
  const source = findSource(item);
  if (!source) return null;
  // Voice has no right panel of its own in the storybook, so it uses the SMS one (as in the Voice inbox).
  const panel = (
    <LinkedRightPanel
      channel={item.channel === 'voice' ? 'sms' : item.channel}
      ticketId={source.ticketId}
      inboxName={item.inbox}
      unassigned={item.view === 'Unassigned'}
      conversationId={item.id}
    />
  );
  if (item.channel === 'email') {
    return (
      <>
        <ConversationDetail conversation={source} signatures={[]} setSignatures={() => {}} defaultSignatureId={null} />
        {panel}
      </>
    );
  }
  if (item.channel === 'voice') return <VoiceTab call={source} panel={panel} />;
  return (
    <>
      {item.channel === 'slack'
        ? <SlackChatPanel inboxName={item.inbox} conversation={source} />
        : <ChatPanel channel={item.channel} conversation={source} />}
      {panel}
    </>
  );
}

function ViewerModal({ tabs, activeId, onSelect, onCloseTab, onClose }) {
  const [closing, exit] = useModalExit();
  // Closing the window (or its last tab) plays the exit animation first.
  const close = () => exit(onClose);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !document.querySelector('.lc-backdrop')) close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);


  return createPortal(
    <div className={`cv-backdrop${closing ? ' is-closing' : ''}`} onClick={close}>
      <div className="cv-window" role="dialog" aria-modal="true" aria-label="Linked conversations" onClick={(e) => e.stopPropagation()}>
        <div className="cv-tabbar">
          <div className="cv-tabs" role="tablist">
            {tabs.map((id) => {
              const c = conversationById(id);
              const selected = id === activeId;
              return (
                <div key={id} className={`cv-tab${selected ? ' cv-tab--active' : ''}`}>
                  <button type="button" role="tab" aria-selected={selected} className="cv-tab__label" title={c ? `${c.name} · ${c.subject}` : undefined} onClick={() => onSelect(id)}>
                    {c?.name}
                  </button>
                  {/* Shows on hover, even with one tab; closing the last tab closes the window */}
                  <button type="button" className="cv-tab__close" aria-label={`Close ${c?.name}`} onClick={() => (tabs.length === 1 ? close() : onCloseTab(id))}>
                    <Icon name="close" size={14} />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="cv-tabbar__end">
            <Button iconOnly variant="ghost" size="xs" aria-label="Close" onClick={close}>
              <Icon name="close" size={14} />
            </Button>
          </div>
        </div>
        <div className="cv-body" role="tabpanel">
          {activeId && <ConversationTab key={activeId} item={conversationById(activeId)} />}
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ConversationViewerProvider({ children }) {
  const [tabs, setTabs] = React.useState([]);
  const [activeId, setActiveId] = React.useState(null);

  const value = React.useMemo(() => ({
    canOpen: (id) => !!conversationById(id),
    open: (id) => {
      const key = String(id);
      setTabs((t) => (t.includes(key) ? t : [...t, key]));
      setActiveId(key);
    },
  }), []);

  const closeTab = (id) => {
    const i = tabs.indexOf(id);
    const next = tabs.filter((t) => t !== id);
    setTabs(next);
    if (id === activeId) setActiveId(next[Math.max(0, i - 1)] ?? null);
  };
  const closeAll = () => { setTabs([]); setActiveId(null); };

  return (
    <ConversationViewerContext.Provider value={value}>
      {children}
      {tabs.length > 0 && (
        <ViewerModal tabs={tabs} activeId={activeId} onSelect={setActiveId} onCloseTab={closeTab} onClose={closeAll} />
      )}
    </ConversationViewerContext.Provider>
  );
}
