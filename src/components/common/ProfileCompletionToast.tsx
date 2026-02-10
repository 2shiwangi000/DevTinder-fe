type Props = {
  percent: number;
  onClose?: () => void;
};

export default function ProfileCompletionToast({ percent, onClose }: Props) {
  if (!percent || percent >= 100) return null;

  return (
    <div className="fixed bottom-2 right-0 z-50">
      <div className="max-w-md w-[100vw] bg-base-100/95 backdrop-blur shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium">Profile {percent}% complete</p>
          <div className="h-1 mt-1 bg-base-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <button className="btn btn-ghost btn-xs" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
