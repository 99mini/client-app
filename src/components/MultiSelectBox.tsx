import { koreanToEnglishCategory, romanizeAddress } from '@/utils/i11n';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultiSelectBoxProps {
  title: string;
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const MultiSelectBox = ({ title, options: givenOptions, defaultValue, onChange }: MultiSelectBoxProps) => {
  const [options, setOptions] = useState<string[]>(defaultValue ? [defaultValue] : []);

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: { value },
    } = event;

    if (value.includes('clear')) {
      setOptions(['All']);
      if (onChange) {
        onChange('');
      }
      return;
    }

    setOptions((prev) => {
      if (prev.includes('All')) {
        return typeof value === 'string' ? value.split(',') : value.filter((v) => v !== 'All');
      }
      return typeof value === 'string' ? value.split(',') : value;
    });

    if (!onChange) {
      return;
    }

    onChange(typeof value === 'string' ? value : value.join(','));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={title}>{title}</InputLabel>
        <Select
          labelId={title}
          // multiple
          value={options}
          onChange={handleChange}
          input={<OutlinedInput label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <MenuItem value={'clear'}>{'All'}</MenuItem>
          {givenOptions.map((name) => {
            const isCategory = koreanToEnglishCategory(name) != name;
            if (name === 'All') {
              return (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              );
            }
            return (
              <MenuItem key={name} value={name}>
                {isCategory ? koreanToEnglishCategory(name) : `${romanizeAddress(name)} (${name})`}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectBox;
