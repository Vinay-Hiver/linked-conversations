import TemplatePicker from './TemplatePicker';
import './TemplateModal.css';

// Anchored, chrome-less variant of the template picker (Figma nodes 266:891 /
// 266:1035 / 266:1586) — same TemplatePicker interaction as the centered
// TemplateModal, but floats above its trigger instead of a full-screen dialog.
// Open state and click-outside handling live in the caller (see
// ChatPanel's TemplatePickerButton), same pattern as the emoji picker.
export default function TemplatePickerPopover({ onSend, onDone, anchorLeft, anchorTop }) {
  return (
    <div className="template-picker-popover" style={{ left: anchorLeft ?? 0, top: anchorTop ?? 0 }}>
      <TemplatePicker onSend={onSend} onDone={onDone} />
    </div>
  );
}
