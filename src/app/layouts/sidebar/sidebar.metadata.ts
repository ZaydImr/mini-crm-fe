// Sidebar route metadata
export interface RouteInfo {
  path: string | null;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  submenu: RouteInfo[];
}
