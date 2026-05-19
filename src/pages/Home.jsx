import { useNavigate } from 'react-router-dom';
import TrainList from '../components/TrainList';

const Home = () => {
  const navigate = useNavigate();
  return <TrainList onSelectTrain={(id) => navigate(`/booking/${id}`)} />;
};

export default Home;