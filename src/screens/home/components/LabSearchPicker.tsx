import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../css/SearchPicker.module.css';
import { LAB_TESTS } from '../types/test';

interface Props {
  selectedCats: string[];
  setSelectedCats: React.Dispatch<React.SetStateAction<string[]>>;
}

const LabSearchPicker = ({ selectedCats, setSelectedCats }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (id: string) => {
    setSelectedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div className={`${styles.searchWrapper} ${isOpen ? styles.active : ''}`}>
        <span className={styles.searchIcon}>🔍</span>
        <input 
          type="text" 
          placeholder="Search for tests..." 
          className={styles.input} 
          onFocus={() => setIsOpen(true)}
        />
        <button 
          className={`${styles.pickerTrigger} ${selectedCats.length > 0 ? styles.hasSelection : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.tagIcon}>🏷️</span>
          <span>{selectedCats.length > 0 ? `${selectedCats.length} Categories` : 'Categories'}</span>
          <span className={`${styles.arrow} ${isOpen ? styles.up : ''}`}>▾</span>
        </button>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span className={styles.headerTitle}>Filter by Category</span>
            <button className={styles.resetBtn} onClick={() => setSelectedCats([])}>Reset</button>
          </div>
          <div className={styles.grid}>
            {LAB_TESTS.map((cat) => (
              <div 
                key={cat.id} 
                className={`${styles.card} ${selectedCats.includes(cat.id) ? styles.cardSelected : ''}`}
                onClick={() => toggleCategory(cat.id)}
              >
                <div className={styles.cardContent}>
                  <p className={styles.catName}>{cat.name}</p>
                  <p className={styles.catCount}>{cat.tests.length} Tests</p>
                </div>
                <div className={styles.checkbox}>
                  {selectedCats.includes(cat.id) && '✓'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabSearchPicker;