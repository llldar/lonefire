import React from 'react';

import { CardImg as BaseCardImg, CardImgOverlay } from './style';

export interface CardImgProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  src: string;
  alt?: string;
}

const CardImg: React.FC<CardImgProps> = (props: CardImgProps) => {
  const { children, className, top = true, bottom, left, right, src, alt } = props;
  return (
    <>
      <BaseCardImg
        src={src}
        alt={alt}
        layout="responsive"
        width="150"
        height="100"
        className={className}
        left={left}
        right={right}
        top={top}
        bottom={bottom}
      />
      {children ? <CardImgOverlay>{children}</CardImgOverlay> : null}
    </>
  );
};

export default CardImg;
