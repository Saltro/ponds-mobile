import Pool from '@/components/Pool';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const Pools = () => {
  return (
    <Swiper>
      <SwiperSlide>
        <Pool title="计划池" />
      </SwiperSlide>
      <SwiperSlide>
        <Pool title="就绪池" />
      </SwiperSlide>
      <SwiperSlide>
        <Pool title="执行池" />
      </SwiperSlide>
      <SwiperSlide>
        <Pool title="验收池" />
      </SwiperSlide>
      <SwiperSlide>
        <Pool title="完成池" />
      </SwiperSlide>
      <SwiperSlide>
        <Pool title="阻塞池" />
      </SwiperSlide>
      <SwiperSlide>
        <Pool title="酱油池" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Pools;
