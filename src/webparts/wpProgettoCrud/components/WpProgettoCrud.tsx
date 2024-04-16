import * as React from 'react';
// import styles from './WpProgettoCrud.module.scss';
import type { IWpProgettoCrudProps } from './IWpProgettoCrudProps';
import { SPFI } from '@pnp/sp';
import { useEffect, useState } from 'react';
import { IBusinesses } from '../../../interfaces';
import { getSP } from '../../../pnpjsConfig';
import { Dropdown, IDropdownOption, IDropdownStyles, IStackTokens, Stack, TextField } from '@fluentui/react';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 }, root: { height: 100 } };
const stackTokens: IStackTokens = { childrenGap: 30 };

const WpProgettoCrud = (props: IWpProgettoCrudProps): JSX.Element => {

  const sp: SPFI = getSP();
  const [listItems, setListItems] = useState<IBusinesses[]>([]);
  const [client, setClient] = useState<string>('');

  const getListItems = async (): Promise<IBusinesses[]> => {
    const items = sp.web.lists.getById(props.listGuid).items.orderBy('Title', true)();
    return (await items).map((item) => ({
        id: item.Id,
        title: item.Title,
        country: item.Country,
        client: item.Client
    }));
  }

  useEffect(() => {
    if(props.listGuid && props.listGuid !== '') {
      getListItems().then((items) => {
        setListItems(items);
      }).catch(error => {
        console.error('Error getting list items:', error);
      });
    }
  }, [props]);

  const handleDropdownChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    if (option) {
      const selectedBusiness = listItems.find(item => item.id === parseInt(option.key as string));
      if (selectedBusiness) {
        setClient(selectedBusiness.client);
      }
    }
  };

  return (
    <>
      <Stack horizontal tokens={stackTokens} verticalAlign="start">
        <Stack>
          <Dropdown
            placeholder="Select an option"
            label="Choose a business"
            options={listItems.map((item: IBusinesses) => ({
              key: item.id.toString(),
              text: item.title
            }))}
            styles={dropdownStyles}
            onChange={ handleDropdownChange }
          />
        </Stack>

        <Stack>
          <TextField style={{ width: 300 }} label="Your client" value = {client} />
        </Stack>
      </Stack>
      <Stack horizontal tokens={stackTokens}>
        <TextField label="Notes" multiline rows={5} style={{ width: 630 }}/>
      </Stack>
    </>
  )
}

export default WpProgettoCrud;

