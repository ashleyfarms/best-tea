import { TeaGlass } from './TeaGlass';

type Props = {
  message: string;
  visible: boolean;
};

/** Brief celebration toast after an upvote */
export function VoteToast({ message, visible }: Props) {
  if (!visible) return null;
  return (
    <div className="vote-toast" role="status" aria-live="polite">
      <TeaGlass size={22} />
      <span>{message}</span>
    </div>
  );
}
