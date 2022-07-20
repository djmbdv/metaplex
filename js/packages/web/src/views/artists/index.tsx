import { Col, Layout } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { ArtistCard } from '../../components/ArtistCard';
import { useMeta } from '../../contexts';
import { useCreadores } from '../../hooks/useCreator';
import { Artist } from '../../types';
const { Content } = Layout;

export const ArtistsView = () => {
  const { whitelistedCreatorsByCreator } = useMeta();
  const [arrayArtist, setArrayArtist] = useState<Artist[]>(
    Object.values(whitelistedCreatorsByCreator).map(a => {
      return {
        address: a.info.address,
        name: a.info.name || '',

        image: a.info.image || '',
        link: a.info.twitter || '',
        background: a.info.background || '',
      };
    }),
  );
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const items = Object.values(whitelistedCreatorsByCreator);
  useEffect(() => {
    fetch('https://apinft.proit.studio/').then(async r => {
      let its = (await r.json()).map(i => i as Artist);
      setArrayArtist(its);
    });
  }, []);

  const artistGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid artists-masonry"
      columnClassName="my-masonry-grid_column"
    >
      {arrayArtist.map((m, idx) => {
        const id = m.address;
        return (
          <Link to={`/artists/${id}`} key={idx}>
            <ArtistCard
              key={id}
              artist={{
                address: m.address,
                name: m.name || '',

                image: m.image || '',
                link: m.link || '',
                background: m.background || '',
              }}
            />
          </Link>
        );
      })}
    </Masonry>
  );

  return (
    <Layout style={{ margin: 0, marginTop: 30 }}>
      <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col style={{ width: '100%', marginTop: 10 }}>{artistGrid}</Col>
      </Content>
    </Layout>
  );
};
