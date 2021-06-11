import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { api } from '../services/api';
import '../styles/sidebar.scss';


interface IGenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ISideBarProps {
  selectedGenreId: number;
  onClickButton(id: number): void
}

export function SideBar({ selectedGenreId, onClickButton }: ISideBarProps) {
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);

  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}