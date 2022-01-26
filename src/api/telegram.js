import axios from 'axios';
import {TOKEN_TELEGRAM, CHAT_ID} from '../helpers/Constants';

const sendMessage = async (text, chat_id = CHAT_ID) => {
  console.log('text', text);
  return await axios.post(
    `https://api.telegram.org/bot${TOKEN_TELEGRAM}/sendMessage`,
    {chat_id, text},
  );
};

export default {sendMessage};
