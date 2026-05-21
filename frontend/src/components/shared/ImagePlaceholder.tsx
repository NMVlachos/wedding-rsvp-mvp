type Ratio = '16x9' | '3x4' | '1x1' | '4x3';

const ratioClass: Record<Ratio, string> = {
  '16x9': 'ph-16x9',
  '3x4':  'ph-3x4',
  '1x1':  'ph-1x1',
  '4x3':  'ph-4x3',
};

interface Props {
  ratio: Ratio;
  label: string;
}

export default function ImagePlaceholder({ ratio, label }: Props) {
  return (
    <div className={`image-placeholder ${ratioClass[ratio]}`}>
      {label}
    </div>
  );
}
