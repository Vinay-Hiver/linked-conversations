import React, { useState, useRef, useEffect } from 'react';
import addEmojiIcon from '../../icons/add-emoji.svg';
import deleteMessageIcon from '../../icons/delete-message.svg';
import openInSlackIcon from '../../icons/optn-in-slack.svg';
import emojiIcon from '../../icons/emoji.svg';
import attachFileIcon from '../../icons/attach-file.svg';
import './SlackChatPanel.css';

const RANDOM_REPLIES = [
  'Thanks, got it!', 'Sure, let me check.', 'Sounds good 👍', 'On it!',
  'Appreciate it.', 'Okay, will do.', 'Great, thanks for the update.',
];
const randomReply = () => RANDOM_REPLIES[Math.floor(Math.random() * RANDOM_REPLIES.length)];

function formatNow() {
  return new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

const EMOJIS = ['👍', '❤️', '😀', '🎉', '✅', '🙏', '🔥', '👀', '😂', '💯'];

// A single Slack-style full-width message row with a hover toolbar + reactions.
function SlackMessage({ name, time, text, role, initial, color, reactions = {}, onAddReaction, onRemoveReaction, onDelete }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!pickerOpen) return undefined;
    const onClick = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setPickerOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [pickerOpen]);

  const reactionList = Object.entries(reactions);

  return (
    <div className={`slack-msg slack-msg--${role}`}>
      <span className="slack-msg__avatar" style={{ background: color }}>{initial}</span>
      <div className="slack-msg__body">
        <div className="slack-msg__head">
          <span className="slack-msg__name">{name}</span>
          <span className="slack-msg__time">{time}</span>
        </div>
        <div className="slack-msg__text">{text}</div>

        {reactionList.length > 0 && (
          <div className="slack-reactions">
            {reactionList.map(([emoji, count]) => (
              <button key={emoji} type="button" className="slack-reaction" title="Remove reaction" onClick={() => onRemoveReaction(emoji)}>
                <span className="slack-reaction__emoji">{emoji}</span>
                <span className="slack-reaction__count">{count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="slack-msg__toolbar" ref={wrapRef}>
        <button type="button" className="slack-msg__tool" title="Add emoji" onClick={() => setPickerOpen((o) => !o)}>
          <img src={addEmojiIcon} width="14" height="14" alt="" />
        </button>
        {role === 'agent' && (
          <button type="button" className="slack-msg__tool" title="Delete message" onClick={onDelete}>
            <img src={deleteMessageIcon} width="14" height="14" alt="" />
          </button>
        )}
        <button type="button" className="slack-msg__tool" title="Open in Slack">
          <img src={openInSlackIcon} width="14" height="14" alt="" />
        </button>

        {pickerOpen && (
          <div className="slack-emoji-picker">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="slack-emoji-picker__item"
                onClick={() => { onAddReaction(emoji); setPickerOpen(false); }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SlackChatPanel({ inboxName, conversation }) {
  const AGENT = { name: 'Mark Scout (You)', initial: 'M', color: '#d96d71' };
  const custDisplay = conversation?.name || 'Customer';
  const CUSTOMER = { name: custDisplay, initial: custDisplay.charAt(0).toUpperCase(), color: conversation?.avatarColor || '#7b8bd4' };

  const [messages, setMessages] = useState(
    (conversation?.messages || []).map((m, i) => ({ ...m, id: m.id || `m-${i}` }))
  );
  const [text, setText] = useState('');
  const threadRef = useRef(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function send() {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { id: `agent-${Date.now()}`, kind: 'agent-text', text: value, time: formatNow() }]);
    setText('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: `reply-${Date.now()}`, kind: 'incoming', text: randomReply(), time: formatNow() }]);
    }, 2000);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const deleteMsg = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));

  const addReaction = (id, emoji) =>
    setMessages((prev) => prev.map((m) => {
      if (m.id !== id) return m;
      const reactions = { ...(m.reactions || {}) };
      reactions[emoji] = (reactions[emoji] || 0) + 1;
      return { ...m, reactions };
    }));

  // Clicking an existing reaction removes it entirely.
  const removeReaction = (id, emoji) =>
    setMessages((prev) => prev.map((m) => {
      if (m.id !== id) return m;
      const reactions = { ...(m.reactions || {}) };
      delete reactions[emoji];
      return { ...m, reactions };
    }));

  return (
    <div className="slack-panel">
      <div className="slack-topbar">
        <span className="slack-topbar__name">{conversation?.name}</span>
        <span className="slack-topbar__chip">#{conversation?.channel}</span>
      </div>

      <div className="slack-thread" ref={threadRef}>
        {messages.map((m) => {
          const isAgent = m.kind === 'agent-text';
          const who = isAgent ? AGENT : CUSTOMER;
          return (
            <SlackMessage
              key={m.id}
              role={isAgent ? 'agent' : 'user'}
              name={who.name}
              initial={who.initial}
              color={who.color}
              time={m.time}
              text={m.text}
              reactions={m.reactions}
              onAddReaction={(emoji) => addReaction(m.id, emoji)}
              onRemoveReaction={(emoji) => removeReaction(m.id, emoji)}
              onDelete={() => deleteMsg(m.id)}
            />
          );
        })}
      </div>

      <div className="slack-composer-wrap">
        <div className="slack-composer">
          <textarea
            className="slack-composer__input"
            placeholder="Shift + Enter for new line. Type ‘/’ to search for Slack templates and send quick replies"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <div className="slack-composer__toolbar">
            <div className="slack-composer__tools">
              <button type="button" className="slack-composer__tool-btn"><img src={emojiIcon} width="16" height="16" alt="" /></button>
              <button type="button" className="slack-composer__tool-btn"><img src={attachFileIcon} width="16" height="16" alt="" /></button>
            </div>
            <button type="button" className="slack-composer__send" disabled={!text.trim()} onClick={send}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
