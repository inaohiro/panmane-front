import * as React from "react";

interface Props {
  place: string;
}

const Header = ({ place }: Props) => (
  <div className="header">
    <div className="place">{place}</div>
  </div>
);

export default Header;
