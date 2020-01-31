import React from 'react';
import { Triangle } from 'react-feather';

export default ({
  className,
  direction,
  ...otherProps
}: {
  className?: string;
  direction: 'up' | 'down';
}) => {
  if (direction === 'up') {
    return (
      <Triangle
        {...otherProps}
        className={className}
        size={16}
        fill="#8EA604"
        color="#8EA604"
      />
    );
  }
  return (
    <Triangle
      {...otherProps}
      className={className}
      transform="rotate(180)"
      size={16}
      fill="#EA5A0D"
      color="#EA5A0D"
    />
  );
};

// export const CustomXTick = props => {
//   const { x, y, stroke, payload } = props;
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text x={0} y={0} dy={12} textAnchor="middle" fill="#999" fontSize="14">
//         {payload.value}
//       </text>
//       {props.dataKey && (
//         <text x={0} y={0} dy={28} textAnchor="middle" fill="#999" fontSize="12">
//           {toEur(props.data[props.index][props.dataKey])}
//         </text>
//       )}
//     </g>
//   );
// };

// export const CustomYTick = props => {
//   const { x, y, stroke, payload } = props;
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={0}
//         dx={-4}
//         dy={4}
//         textAnchor="end"
//         fill="#999"
//         fontSize="14"
//       >
//         {toK(payload.value)}
//       </text>
//     </g>
//   );
// };

// export const CustomTooltip = ({ active, payload, label }) => {
//   if (active) {
//     return (
//       <div className="card card-body">
//         {payload.map(p => (
//           <span key={p.value} className="d-flex justify-content-between">
//             <strong className="mr-4">{p.dataKey}</strong>{' '}
//             <span>{toEur(p.value)}</span>
//           </span>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };
