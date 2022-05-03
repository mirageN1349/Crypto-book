import { Box, Drawer, List, ListItem } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type Item = {
  title: string;
  path: string;
};

const styles = {
  box: {
    width: 210,
    background: '#25262D',
    height: '100%',
    padding: '0 15px',
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    cursor: 'pointer',
    color: '#fff',
    margin: '20px 10px 0 10px',
  },
};

type Props = {
  items: Item[];
};

export function Sidebar({ items }: Props) {
  return (
    <Drawer variant="permanent">
      <Box sx={styles.box} role="presentation" component="div">
        {items.map(item => (
          <Link key={item.path} href={item.path}>
            <p style={styles.link}>{item.title}</p>
          </Link>
        ))}
      </Box>
    </Drawer>
  );
}
