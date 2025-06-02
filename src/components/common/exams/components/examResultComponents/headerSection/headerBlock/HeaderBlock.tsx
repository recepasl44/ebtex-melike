
interface HeaderBlockProps {
  text: string;
  fill: string;
  stroke: string;
  cutLeft?: boolean;
  cutRight?: boolean;
  width?: string;
  height?: string;
}

const HeaderBlock = ({
  text,
  fill,
  stroke,
  cutLeft = false,
  cutRight = false,
  width = "200px",
  height = "40px",
}: HeaderBlockProps) => {
  const numericHeight = parseInt(height);
  const cutSize = Math.round(numericHeight * 0.6);

  let clipPath = "none";
  if (cutLeft && cutRight) {
    clipPath = `polygon(${cutSize}px 0, 100% 0, calc(100% - ${cutSize}px) 100%, 0% 100%)`;
  } else if (cutLeft) {
    clipPath = `polygon(${cutSize}px 0, 100% 0, 100% 100%, 0% 100%)`;
  } else if (cutRight) {
    clipPath = `polygon(0 0, 100% 0, calc(100% - ${cutSize}px) 100%, 0% 100%)`;
  }

  const marginLeft = cutLeft ? `-${cutSize - 1}px` : undefined;

  return (
    <div
      className="d-flex align-items-center justify-content-center text-white "
      style={{
        backgroundColor: fill,
        border: `1px solid ${stroke}`,
        width,
        height,
        clipPath,
        flexShrink: 0,
        fontSize: "0.8rem",
        marginLeft,
        zIndex: 1,
      }}
    >
      {text}
    </div>
  );
};

export default HeaderBlock;
