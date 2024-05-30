const breakpoints = {
  small: '639px',
  medium: '1047px',
  large: '1048px',
};
export const device = {
  small: `@media screen and (max-width: ${breakpoints.small})`,
  medium: `@media screen and (min-width: ${breakpoints.small}) and (max-width: ${breakpoints.medium})`,
  large: `@media screen and (min-width: ${breakpoints.large})`,
};
