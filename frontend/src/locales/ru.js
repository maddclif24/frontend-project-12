export default {
  loginPage: {
    title: 'Войти',
    username: 'Ваш ник',
    password: 'Ваш пароль',
    footer: {
      text: 'Нет аккаунта?',
      link: 'Регистрация',
    },
  },
  chatPage: {
    channels: {
      name: 'Каналы',
      modalAdd: {
        title: 'Добавить канал',
        close: 'Закрыть',
        submit: 'Добавить',
      },
      modalRename: {
        name: 'Переименовать',
        title: 'Переименовать канал',
        close: 'Закрыть',
        submit: 'Переименовать',
      },
      modalRemove: {
        name: 'Удалить',
        title: 'Удалить канал',
        close: 'Закрыть',
        submit: 'Удалить',
      },
    },
    form: {
      header: {
        channelName: '',
        countMessages: '',
      },
      inputPlaceholder: 'Введите сообщение...',
    },
  },
};
