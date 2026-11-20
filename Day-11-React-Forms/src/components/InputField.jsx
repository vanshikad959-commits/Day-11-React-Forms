import ErrorMessage from "./ErrorMessage.jsx";

export default function InputField({
  label, name, as = "input", icon: Icon, error, rightSlot, children, className = "", ...props
}) {
  const Tag = as;
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-bold">{label}</label>
      <div className="relative">
        {Icon && <Icon size={18} className={`pointer-events-none absolute left-4 text-muted ${as === "textarea" ? "top-4" : "top-1/2 -translate-y-1/2"}`} />}
        <Tag
          id={name}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`field ${error ? "field-error" : ""} ${rightSlot ? "pr-12" : ""} ${as === "textarea" ? "resize-none" : ""}`}
          {...props}
        >
          {children}
        </Tag>
        {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      <ErrorMessage id={`${name}-error`} message={error} />
    </div>
  );
}
