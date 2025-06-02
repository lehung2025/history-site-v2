import "@testing-library/jest-dom";
import React from "react";

// Thêm React vào global để không cần import trong file test
global.React = React;

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, fill, priority, ...props }: any) => {
    const style = fill
      ? { width: "100%", height: "100%", objectFit: "contain" }
      : {};
    return (
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        style={style}
        {...props}
      />
    );
  },
}));
