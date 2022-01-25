import style from './index.module.scss';
import TaskCard from './TaskCard';

interface IProps {
  title: string;
}

const tasks = [
  {
    name: '吃饭',
    category: '日常',
  },
  {
    name: '写代码',
    category: '工作',
  },
  {
    name: '睡觉',
  },
];

const Pool: React.FC<IProps> = ({ title }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>
      {tasks.map((task, index) => {
        return <TaskCard item={task.name} category={task?.category} key={index} />;
      })}
    </div>
  );
};

export default Pool;
