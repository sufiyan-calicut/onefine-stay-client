import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatar1 from '../../../../public/vectors/Avatar1.webp';
import avatar2 from '../../../../public/vectors/Cartoon_art-removebg-preview.webp';
import avatar3 from '../../../../public/vectors/Freepik__Download_Free_Videos__Vectors__Photos__and_PSD-removebg-preview.webp';
import avatar4 from '../../../../public/vectors/Male_avatar__portrait_of_a_young_man_with_a_beard__Vector_illustration_of_male_character_in_modern_color_style-removebg-preview.webp';
import avatar5 from '../../../../public/vectors/Man_profile_cartoon___Download_on_Freepik-removebg-preview.webp';
import avatar6 from '../../../../public/vectors/Untitled_design__1_-removebg-preview.webp';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function AvatarComponent() {
  return (
    <div className='p-3'>
      <Stack
        direction='row'
        spacing={2}
        className='flex flex-wrap max-w-xs justify-center cursor-pointer items-center gap-2'
      >
        <Avatar alt='Remy Sharp' src={avatar1} sx={{ width: 70, height: 70 }} />
        <Avatar alt='Travis Howard' src={avatar2} sx={{ width: 70, height: 70 }} />
        <Avatar alt='Cindy Baker' src={avatar3} sx={{ width: 70, height: 70 }} />
        <Avatar alt='Cindy Baker' src={avatar4} sx={{ width: 70, height: 70 }} />
        <Avatar alt='Cindy Baker' src={avatar5} sx={{ width: 70, height: 70 }} />
        <Avatar alt='Travis Howard' src={avatar2} sx={{ width: 70, height: 70 }} />

        {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar> */}
      </Stack>
    </div>
  );
}
