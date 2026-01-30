import { type TooltipContentProps } from 'recharts'

export const ToolTip = ({ active, payload }: TooltipContentProps<string, string>) => {
  const isVisible = active && payload && payload.length;
  const bgColor = payload[0]?.payload.fill ?? '#000000';

  console.log(payload);

  return (
    <div className={`custom-tooltip rounded-md border-2 border-white p-2`} style={{ visibility: isVisible ? 'visible' : 'hidden', backgroundColor: bgColor }}>
      {isVisible && (
        <>
          <p className="label text-white">{`${payload[0].payload.category} : ${payload[0].value}`}</p>
        </>
      )}
    </div>
  );
}
