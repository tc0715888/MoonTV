import { Link as LinkIcon, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface DemoCardProps {
  id: string;
  title: string;
  poster: string;
  rate?: string;
  type?: string;
}

function SearchCircle({
  className = '',
  fillColor = 'none',
}: {
  className?: string;
  fillColor?: string;
}) {
  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className} block relative`}
    >
      <circle
        cx='22'
        cy='22'
        r='20'
        stroke='white'
        strokeWidth='1.5'
        fill={fillColor}
      />
      <foreignObject x='0' y='0' width='44' height='44'>
        <div className='w-full h-full flex items-center justify-center'>
          <Search className='h-7 w-7 text-white' strokeWidth={2} />
        </div>
      </foreignObject>
    </svg>
  );
}

const DemoCard = ({ id, title, poster, rate, type }: DemoCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/aggregate?q=${encodeURIComponent(title)}&type=${type}`);
  };

  return (
    <div
      className='group relative w-full rounded-lg bg-transparent flex flex-col cursor-pointer transition-all duration-300 ease-in-out'
      onClick={handleClick}
    >
      {/* 海报图片区域 */}
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-md transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1)'>
        <Image
          src={poster}
          alt={title}
          fill
          className='object-cover transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110'
          referrerPolicy='no-referrer'
          priority={false}
        />

        {/* 评分徽章 */}
        {rate && (
          <div className='absolute top-2 right-2 min-w-[1.25rem] h-4 w-4 sm:h-7 sm:w-7 sm:min-w-[1.5rem] bg-pink-500 rounded-full flex items-center justify-center px-1 shadow-md transform transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110 group-hover:rotate-3'>
            <span className='text-white text-[0.5rem] sm:text-xs font-bold leading-none'>
              {rate}
            </span>
          </div>
        )}

        {/* 悬浮层 - 搜索按钮 */}
        <div
          style={{ willChange: 'opacity' }}
          className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) flex items-center justify-center'
        >
          <div className='transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) scale-90 group-hover:scale-110 group-hover:rotate-12'>
            <SearchCircle className='group-hover:fill-green-500' />
          </div>
        </div>

        {/* 外部链接按钮 */}
        <a
          href={`https://movie.douban.com/subject/${id}`}
          target='_blank'
          rel='noopener noreferrer'
          onClick={(e) => e.stopPropagation()}
          className='absolute top-2 left-2 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)'
        >
          <div className='w-4 h-4 sm:w-7 sm:h-7 rounded-full bg-[#22c55e] flex items-center justify-center shadow-md opacity-70 hover:opacity-100 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-[#16a34a]'>
            <LinkIcon className='w-4 h-4 text-white' strokeWidth={2} />
          </div>
        </a>
      </div>

      {/* 信息层 */}
      <span className='mt-2 px-1 block text-gray-900 font-semibold truncate w-full text-center text-xs sm:text-sm dark:text-gray-200 transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1) group-hover:translate-y-[-2px] translate-y-1 opacity-80 group-hover:opacity-100 group-hover:text-green-600 dark:group-hover:text-green-400'>
        {title}
      </span>
    </div>
  );
};

export default DemoCard;
