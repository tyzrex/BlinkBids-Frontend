export interface ISidebarItem {
  icon: JSX.Element;
  className?: string;
  label: string;
  href: string;
    rightIcon?: JSX.Element;
}

export interface INavlinks {
  name: string;
  href: string;
  icon: JSX.Element;

}