import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from 'redux/contactsSlice';
import s from '../contactList/contactList.module.css';

export default function ContactsItem() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.value);
  const contacts = useSelector(state => state.contacts.elements);

  const filteredItems = () => {
    const loweredFilter = filter.toLowerCase();
    const filtered = contacts.filter(elem =>
      elem.name.toLowerCase().includes(loweredFilter)
    );
    return filtered;
  };

  return filteredItems().map(elem => {
    return (
      <li key={nanoid()} className={s.contacts__item}>
        {elem.name}: {elem.number}
        <button type="button" onClick={() => dispatch(removeContact(elem))}>
          Delete
        </button>
      </li>
    );
  });
}
