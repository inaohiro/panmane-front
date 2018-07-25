import * as React from "react";

interface Props {
  place: string;
}

const Header = ({ place }: Props) => (
  <div className="header">
    <div className="place">残りパンツ数</div>
  </div>
);

export default Header;
