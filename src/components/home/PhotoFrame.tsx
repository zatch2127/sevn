type PhotoFrameProps = {
  caption: string;
  dark?: boolean;
  className?: string;
};

export function PhotoFrame({ caption, dark = false, className = '' }: PhotoFrameProps) {
  return (
    <div className={`photo-frame${dark ? ' is-dark' : ''}${className ? ` ${className}` : ''}`} role="img" aria-label={caption}>
      <span className="photo-frame__caption" aria-hidden="true">{caption}</span>
    </div>
  );
}
