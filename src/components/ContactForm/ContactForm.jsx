import { useReducer } from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { nanoid } from '@reduxjs/toolkit';
import s from './contactForm.module.css';

const initialState = {
  name: '',
  number: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'name': {
      return {
        ...state,
        name: action.payload,
      };
    }
    case 'number': {
      return {
        ...state,
        number: action.payload,
      };
    }
    case 'reset': {
      return initialState;
    }
    default:
      return state;
  }
};

export default function ContactForm() {
  const [state, dispatchAction] = useReducer(reducer, initialState);
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contacts.elements);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    dispatchAction({
      type: name,
      payload: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = { id: nanoid(), name: state.name, number: state.number };
    console.log(newContact);
    console.log(contacts);

    const test = contacts.some(user => isEqual(newContact.number, user.number));
    console.log(test);
    !test
      ? dispatch(addContact(newContact))
      : alert(`Number ${newContact.number} is already been used in contacts!`);
    dispatchAction({ type: 'reset' });
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.contacts__label}>
        Name
        <br />
        <input
          className={s.input}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <br />
      <label className={s.contacts__label}>
        Number
        <br />
        <input
          className={s.input}
          type="tel"
          name="number"
          value={state.number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <button type="submit" className={s.button}>Add contact</button>
    </form>
  );
};
