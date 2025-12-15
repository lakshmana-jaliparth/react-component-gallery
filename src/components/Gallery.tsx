
import { useMemo, useState } from 'react';
import type { ComponentInfo, Category } from '../types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ComponentCard from './ComponentCard';

interface GalleryProps {
  components: ComponentInfo[];
}

function Gallery({ components }: GalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const normalize = (v?: string) => (v ?? '').toLowerCase();

  const filteredComponents = useMemo(() => {
    const query = normalize(searchQuery).trim();

    return components.filter((comp) => {
      const matchesCategory =
        selectedCategory === 'All' || comp.category === selectedCategory;

      const haystack = [comp.name, comp.description]
        .filter(Boolean)
        .map(normalize)
        .join(' ');

      const matchesQuery = query === '' || haystack.includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [components, searchQuery, selectedCategory]);

  const totalCount = components.length;
  const filteredCount = filteredComponents.length;

  return (
    <div className="gallery">
      <div className="gallery-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>

      <div className="gallery-results">
        <p className="result-count" aria-live="polite">
          Showing {filteredCount} of {totalCount}{' '}
          {selectedCategory === 'All' ? 'components' : `components in "${selectedCategory}"`}
        </p>
      </div>

      <div className="gallery-grid">
        {filteredCount === 0 ? (
          <div className="empty-state">
            <p>No components match your search.</p>
            <p>
              Try clearing the search or selecting{' '}
              <button
                type="button"
                className="link-button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                All categories
              </button>
              .
            </p>
          </div>
        ) : (
          filteredComponents.map((comp) => <ComponentCard key={comp.id} info={comp} />)
        )}
      </div>
    </div>
  );
}

export default Gallery;
