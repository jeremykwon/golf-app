import { useEffect, useMemo, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { ColorButton } from 'Components/atoms';

const cx = classNames.bind(styles);

const MAX_IMAGE_VIEW_TIME = 10;
let image_view_time = 0;

const Advertising = ({ isAdView, setIsAdView, adList }) => {
	const [adIndex, setAdIndex] = useState(0);
	
	const currentAd = useMemo(() => {
		if (adList.length !== 0) return adList[adIndex];
		else return null;
	}, [adIndex, adList]);

	const addAdIndex = () => {
		if (adList.length - 1 > adIndex) setAdIndex(adIndex + 1);
		else setAdIndex(0);
	};

	// 이미지인 경우에만 3초 보여줌
	// 이미지중 광고 안보이게 되면 남은 시간 만큼 다시 이미지 보여지도록
	// 영상의 경우 처음부터 다시시작됨
	useEffect(() => {
		// 광고가 없으면 동작X
		if (adList.length === 0) return;
		
		if (currentAd.type === 0) {
			let interval = setInterval(() => {
				if (!isAdView) clearInterval(interval);

				if (image_view_time < MAX_IMAGE_VIEW_TIME) image_view_time += 1 ;
				else { addAdIndex(); image_view_time = 0;}
			}, [1000]);
			return () => clearInterval(interval);
		}
	}, [currentAd, isAdView, adList]);

    return (
		<>
			{
				(isAdView && currentAd !== null)  &&
					<div
						className={cx('ad-wrap')}
						onClick={() => {
							setIsAdView(!isAdView);
						}}>
						{
							currentAd.type === 1 &&
								<video
									className={cx('ad-video')}
									autoPlay
									muted
									onEnded={addAdIndex}
									>
									<source src={currentAd.url} type="video/mp4" />
								</video>
						}
			
						{
							currentAd.type === 0 &&
								<img className={cx('ad-image')} src={currentAd.url} alt='광고 이미지' />
						}

						<div className={cx('explanation')}>
							<ColorButton title={'화면을 클릭하시면 주문이 가능합니다'} color={'black'} />
						</div>
					</div>
			}
		</>
    );
};

export default Advertising;
