// Reusable form field primitives for admin forms

interface FieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, hint, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-white/70">
        {label}
        {required && <span className="text-[#c8a96e] text-xs">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-white/30">{hint}</p>}
    </div>
  );
}

export const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-[#1a1a24] border border-white/8 text-white placeholder-white/20 text-sm outline-none focus:border-[#c8a96e]/40 focus:ring-1 focus:ring-[#c8a96e]/15 transition-colors";

export const textareaCls =
  inputCls + " resize-y min-h-[120px] leading-relaxed";

export const selectCls = inputCls + " cursor-pointer";

interface SubmitButtonProps {
  label: string;
  loadingLabel?: string;
  pending?: boolean;
}

export function SubmitButton({ label, loadingLabel, pending }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2.5 rounded-xl bg-[#c8a96e] hover:bg-[#b8996e] text-[#0a0a0f] font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {pending ? (
        <>
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {loadingLabel ?? "Saving…"}
        </>
      ) : (
        label
      )}
    </button>
  );
}

interface DeleteButtonProps {
  id: string;
  action: (prev: unknown, formData: FormData) => Promise<void>;
  label?: string;
}

export function DeleteForm({ id, action, label = "Delete" }: DeleteButtonProps) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="px-3 py-1.5 rounded-lg text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/8 border border-transparent hover:border-red-500/15 transition-all"
        onClick={(e) => {
          if (!confirm(`Delete this ${label.toLowerCase()}? This cannot be undone.`)) {
            e.preventDefault();
          }
        }}
      >
        {label}
      </button>
    </form>
  );
}
