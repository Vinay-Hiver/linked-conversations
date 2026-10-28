import { useEffect, useRef, useState } from 'react';
import { SearchIcon, ArrowLeftIcon } from '../icons/Icon';
import { TEMPLATES, getVariableCount, getSendTimeSlots } from './templates';
import TemplatePreviewCard from './TemplatePreview';
import './TemplateModal.css';

// Drag-and-drop / native file-picker upload field used for image, video, and
// document header variables (Figma node 285:39583).
function FileUploadField({ value, onChange, focusRef }) {
  const inputRef = useRef(null);

  function handleFiles(fileList) {
    const file = fileList?.[0];
    if (file) onChange(file.name);
  }

  return (
    <div
      className="template-upload"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        className="template-upload__input"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {value ? (
        <p className="template-upload__text">{value}</p>
      ) : (
        <p className="template-upload__text">
          Drag your files here or{' '}
          <button
            ref={focusRef}
            type="button"
            className="template-upload__link"
            onClick={() => inputRef.current?.click()}
          >
            choose a file
          </button>
        </p>
      )}
    </div>
  );
}

function buildEmptyValues(template) {
  const values = {};
  getSendTimeSlots(template).forEach((slot) => {
    values[slot.key] = '';
  });
  return values;
}

// The shared list -> variables -> send interaction, used by both the centered
// TemplateModal and the anchored TemplatePickerPopover so the behavior (hover
// preview, sticky highlight, back navigation, send-time form) is identical.
export default function TemplatePicker({ onSend, onDone }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [view, setView] = useState('list');
  const [valuesByTemplate, setValuesByTemplate] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const firstFieldRef = useRef(null);

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      t.name.toLowerCase().includes(q) ||
      (t.body?.text && t.body.text.toLowerCase().includes(q)) ||
      (t.category && t.category.toLowerCase().includes(q))
    );
  });

  // Ensure selected template is valid when filtering changes
  useEffect(() => {
    if (filteredTemplates.length > 0) {
      if (!filteredTemplates.some((t) => t.id === selectedTemplateId)) {
        setSelectedTemplateId(filteredTemplates[0].id);
      }
    }
  }, [searchQuery, filteredTemplates, selectedTemplateId]);

  const selectedTemplate =
    TEMPLATES.find((t) => t.id === selectedTemplateId) || filteredTemplates[0] || TEMPLATES[0];
  const selectedSlots = getSendTimeSlots(selectedTemplate);
  const values = valuesByTemplate[selectedTemplate?.id] || buildEmptyValues(selectedTemplate);

  function handleHoverTemplate(template) {
    setSelectedTemplateId(template.id);
  }

  function handleSelectTemplate(template) {
    setSelectedTemplateId(template.id);
    setValuesByTemplate((prev) => ({
      ...prev,
      [template.id]: prev[template.id] || buildEmptyValues(template),
    }));
    setView('variables');
  }

  function handleValueChange(key, value) {
    setValuesByTemplate((prev) => ({
      ...prev,
      [selectedTemplateId]: { ...values, [key]: value },
    }));
  }

  const allFilled = selectedSlots.every((slot) => (values[slot.key] || '').trim().length > 0);

  function handleSend() {
    onSend?.(selectedTemplate, values);
    onDone?.();
  }

  // Focus the first send-time field as soon as the variables form appears.
  useEffect(() => {
    if (view === 'variables' && firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, [view, selectedTemplateId]);

  // List view: Up/Down move the highlighted template, Enter opens its variables
  // form, Escape closes the whole picker. Variables view: Enter sends once every
  // field is filled, Escape backs out to the list.
  useEffect(() => {
    function handleKeyDown(e) {
      if (view === 'variables') {
        if (e.key === 'Escape') {
          e.preventDefault();
          setView('list');
        } else if (e.key === 'Enter' && allFilled) {
          e.preventDefault();
          handleSend();
        }
        return;
      }

      if (view === 'list') {
        if (e.key === 'Escape') {
          e.preventDefault();
          onDone?.();
          return;
        }
        if (filteredTemplates.length === 0) return;
        const index = filteredTemplates.findIndex((t) => t.id === selectedTemplateId);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = Math.min(index + 1, filteredTemplates.length - 1);
          setSelectedTemplateId(filteredTemplates[Math.max(0, nextIndex)].id);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = Math.max(index - 1, 0);
          setSelectedTemplateId(filteredTemplates[prevIndex].id);
        } else if (e.key === 'Enter' && selectedTemplate) {
          e.preventDefault();
          handleSelectTemplate(selectedTemplate);
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [view, selectedTemplateId, selectedTemplate, allFilled, values, filteredTemplates]);

  const cardRefs = useRef({});
  const searchInputRef = useRef(null);

  // Auto-focus search input when list view is opened
  useEffect(() => {
    if (view === 'list' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [view]);

  // Ensure highlighted template card is auto-scrolled into view during keyboard navigation
  useEffect(() => {
    if (view === 'list' && selectedTemplateId) {
      const el = cardRefs.current[selectedTemplateId];
      if (el) {
        el.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedTemplateId, view]);

  return (
    <div className="template-modal__body">
      <div className="template-modal__left">
        {view === 'list' ? (
          <>
            <div className="template-search">
              <SearchIcon size={16} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search WhatsApp templates"
                className="template-search__input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="template-list">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    ref={(el) => {
                      if (el) cardRefs.current[template.id] = el;
                    }}
                    type="button"
                    className={
                      'template-card' +
                      (template.id === selectedTemplateId ? ' template-card--selected' : '')
                    }
                    onClick={() => handleSelectTemplate(template)}
                    onMouseEnter={() => handleHoverTemplate(template)}
                  >
                    <p className="template-card__name">{template.name}</p>
                    <p className="template-card__meta">
                      {getVariableCount(template) === 0
                        ? 'No variables'
                        : `${getVariableCount(template)} variable${getVariableCount(template) === 1 ? '' : 's'}`}
                    </p>
                  </button>
                ))
              ) : (
                <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--slateTextSubtle)', fontSize: '13px' }}>
                  No templates match your search
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="template-variables">
            <div className="template-variables__scroll">
              <div className="template-variables__header">
                <button
                  type="button"
                  className="template-variables__back"
                  onClick={() => setView('list')}
                >
                  <ArrowLeftIcon size={16} />
                  <span>{selectedTemplate.name}</span>
                </button>
                <p className="template-variables__hint">
                  {selectedSlots.length
                    ? 'Please enter these variables'
                    : 'This template needs no send-time input'}
                </p>
              </div>
              {selectedSlots.length > 0 && (
                <div className="template-variables__fields">
                  {selectedSlots.map((slot, index) => (
                    <label className="template-field" key={slot.key}>
                      <span className="template-field__label">{slot.label}</span>
                      {slot.kind === 'file' ? (
                        <FileUploadField
                          value={values[slot.key]}
                          onChange={(name) => handleValueChange(slot.key, name)}
                          focusRef={index === 0 ? firstFieldRef : undefined}
                        />
                      ) : (
                        <input
                          ref={index === 0 ? firstFieldRef : undefined}
                          type="text"
                          className="template-field__input"
                          placeholder={slot.placeholder}
                          value={values[slot.key]}
                          onChange={(e) => handleValueChange(slot.key, e.target.value)}
                        />
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="template-variables__footer">
              <button
                className="template-variables__send"
                type="button"
                disabled={!allFilled}
                onClick={handleSend}
              >
                Send message
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="template-modal__right">
        <p className="template-modal__preview-label">Preview</p>
        <TemplatePreviewCard template={selectedTemplate} values={values} />
      </div>
    </div>
  );
}
