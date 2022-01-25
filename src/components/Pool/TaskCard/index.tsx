import style from './index.module.scss';

interface ICardProps {
  item: string;
  category?: string;
}
const TaskCard: React.FC<ICardProps> = ({ item, category }) => {
  return (
    <div className={style.card}>
      <div className={style.task}>
        <span className={style.name}>{item}</span>
        <span className={style.category}>{category || '任务'}</span>
      </div>
    </div>
  );
};

export default TaskCard;
