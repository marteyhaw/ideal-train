type IconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
  React.RefAttributes<SVGSVGElement>;

type IconProps = IconSVGProps & {
  title?: string;
  titleId?: string;
};

type Icon = React.FC<IconProps>;

export type CustomerField = {
  id: number;
  name: string;
};

export type OfficeField = {
  id: number;
  name: string;
};

export type EmployeeField = {
  id: number;
  name: string;
};

export type SideNavItem = {
  title: string;
  path: string;
  icon?: Icon;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
