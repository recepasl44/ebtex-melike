import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, ListGroup } from "react-bootstrap";
import SpkListgroup from "../../../@spk-reusable-components/reusable-uielements/spk-listgroup";
import { MENUITEMS } from "../../sidebar/nav";
import searchIcon from "../../../assets/images/media/search.svg";
import searchDark from "../../../assets/images/media/search-dark.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface ISearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<ISearchBarProps> = ({
  placeholder = "Search for Results...",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [noResultText, setNoResultText] = useState("Type something");
  const [noResultColor, setNoResultColor] = useState("text-dark");
  const searchRef = useRef<HTMLDivElement | null>(null);
  // Redux'tan tema bilgisini alma
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Tema durumuna göre ikon seçimi
  const currentSearchIcon = isDark ? searchDark : searchIcon;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    if (!value) {
      setShowResults(false);
      setNoResultText("Type something");
      setNoResultColor("text-dark");
      return;
    }

    const results: any[] = [];
    MENUITEMS.forEach((main: any) => {
      if (main.children) {
        main.children.forEach((sub: any) => {
          results.push(sub);
          if (sub.children) {
            sub.children.forEach((sub2: any) => {
              results.push(sub2);
            });
          }
        });
      }
    });

    const matched = results.filter((item) =>
      item.title?.toLowerCase().startsWith(value.toLowerCase())
    );
    if (matched.length) {
      setSearchResults(matched);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setNoResultText("There is no component with this name");
      setNoResultColor("text-danger");
      setShowResults(true);
    }
  };

  return (
    <div
      className="header-element header-search d-md-block d-none my-auto auto-complete-search"
      ref={searchRef}
    >
      <Form.Control
        type="text"
        className="header-search-bar form-control"
        placeholder={placeholder}
        autoComplete="off"
        value={inputValue}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      {showResults && (
        <div className="card search-result position-absolute">
          <div className="card-header">
            <div className="card-title mb-0 text-break">
              Search result of {inputValue}
            </div>
          </div>
          <div className="card-body overflow-auto">
            <SpkListgroup CustomClass="m-2">
              {searchResults.length ? (
                searchResults.map((item: any) => (
                  <ListGroup.Item key={item.title}>
                    <Link
                      to={`${item.path}/`}
                      className="search-result-item"
                      onClick={() => setShowResults(false)}
                    >
                      {item.title}
                    </Link>
                  </ListGroup.Item>
                ))
              ) : (
                <b className={`${noResultColor}`}>{noResultText}</b>
              )}
            </SpkListgroup>
          </div>
        </div>
      )}
      <Link to="#!" className="header-search-icon border-0">
        <img src={currentSearchIcon} alt="search icon" />
      </Link>
    </div>
  );
};

export default SearchBar;
