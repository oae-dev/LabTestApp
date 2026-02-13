import { useState, useMemo } from 'react';
import { FaChevronDown, FaFlask, FaCheckCircle } from 'react-icons/fa';
import styles from './LabSearchPicker.module.css';
import { LAB_TESTS } from '../tests.utils';
import SearchInput from '../../../common/inputs/SearchInput';

type Props = {
  selectedCats: string[];
  selectedTestIds: string[]; 
  onTestToggle: (testId: string) => void;
};

const LabSearchPicker = ({ selectedCats, selectedTestIds, onTestToggle }: Props) => {
  const [query, setQuery] = useState('');
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    return LAB_TESTS.filter(cat =>
      cat.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const toggleExpand = (id: string) => {
    setExpandedCat(expandedCat === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <SearchInput value={query} onChange={setQuery} placeholder="Search categories..." />
      </div>

      <div className={styles.categoryList}>
        {filteredCategories.map((cat) => {
          const isExpanded = expandedCat === cat.id;
          const isSelected = selectedCats.includes(cat.id);

          return (
            <div key={cat.id} className={styles.accordionItem}>
              <div
                className={`${styles.categoryRow} ${isSelected ? styles.activeRow : ''}`}
                onClick={() => toggleExpand(cat.id)}
              >
                <div className={styles.leftInfo}>
                  <div className={styles.iconBox}><FaFlask /></div>
                  <span className={styles.catName}>{cat.name}</span>
                </div>
                <div className={styles.rightInfo}>
                  {isSelected && <FaCheckCircle className={styles.checkIcon} />}
                  <FaChevronDown className={`${styles.chevron} ${isExpanded ? styles.rotate : ''}`} />
                </div>
              </div>

              {/* Standard Expanded View for Tests */}
              {isExpanded && (
                <div className={styles.expandedContent}>
                  {cat.tests.map(test => (
                    <label key={test.id} className={styles.testLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={selectedTestIds.includes(test.id)}
                        onChange={() => onTestToggle(test.id)}
                      />
                      <span className={styles.testName}>{test.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabSearchPicker;