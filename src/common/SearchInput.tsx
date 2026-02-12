
import { FaSearch } from 'react-icons/fa';
import styles from '../css/common/SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string; // For adding extra external margins if needed
}

export default function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className 
}: SearchInputProps) {
  return (
    <div className={`${styles.searchWrapper} ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
}