import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useGlobalState = createGlobalState(() => {
  const currentPage = ref<AvailablePagesNames>('map')
  function changePage(newPage: AvailablePagesNames) {
    currentPage.value = newPage
  }

  const currentUser = ref<User | null>(null)

  const reports = ref<MyReport[]>([
    {
      surname: 'Петров',
      name: 'Иван',
      team: 'SQL',
      place: 'A1',
      date: '10.10.2023',
    },
    {
      surname: 'Иванов',
      name: 'Петр',
      team: 'Java',
      place: 'B2',
      date: '11.11.2023',
    },
    {
      surname: 'Сидоров',
      name: 'Алексей',
      team: 'Python',
      place: 'C3',
      date: '12.12.2023',
    },
    {
      surname: 'Смирнов',
      name: 'Дмитрий',
      team: 'JavaScript',
      place: 'D4',
      date: '13.01.2023',
    },
    {
      surname: 'Козлов',
      name: 'Сергей',
      team: 'C++',
      place: 'E5',
      date: '14.02.2023',
    },
    {
      surname: 'Васильев',
      name: 'Михаил',
      team: 'Ruby',
      place: 'F6',
      date: '15.03.2023',
    },
    {
      surname: 'Михайлов',
      name: 'Андрей',
      team: 'Go',
      place: 'G7',
      date: '16.04.2023',
    },
    {
      surname: 'Новиков',
      name: 'Игорь',
      team: 'Swift',
      place: 'H8',
      date: '17.05.2023',
    },
    {
      surname: 'Федоров',
      name: 'Николай',
      team: 'Kotlin',
      place: 'I9',
      date: '18.06.2023',
    },
    {
      surname: 'Морозов',
      name: 'Владимир',
      team: 'Rust',
      place: 'J10',
      date: '19.07.2023',
    },
    {
      surname: 'Волков',
      name: 'Константин',
      team: 'TypeScript',
      place: 'K11',
      date: '20.08.2023',
    },
    {
      surname: 'Алексеев',
      name: 'Олег',
      team: 'PHP',
      place: 'L12',
      date: '21.09.2023',
    },
    {
      surname: 'Лебедев',
      name: 'Денис',
      team: 'Scala',
      place: 'M13',
      date: '22.10.2023',
    },
    {
      surname: 'Семенов',
      name: 'Тимур',
      team: 'Perl',
      place: 'N14',
      date: '23.11.2023',
    },
    {
      surname: 'Егоров',
      name: 'Артем',
      team: 'Haskell',
      place: 'O15',
      date: '24.12.2023',
    },
    {
      surname: 'Павлов',
      name: 'Георгий',
      team: 'R',
      place: 'P16',
      date: '25.01.2023',
    },
    {
      surname: 'Ковалев',
      name: 'Владислав',
      team: 'Dart',
      place: 'Q17',
      date: '26.02.2023',
    },
    {
      surname: 'Соколов',
      name: 'Максим',
      team: 'Elixir',
      place: 'R18',
      date: '27.03.2023',
    },
    {
      surname: 'Николаев',
      name: 'Евгений',
      team: 'Julia',
      place: 'S19',
      date: '28.04.2023',
    },
    {
      surname: 'Орлов',
      name: 'Даниил',
      team: 'Lua',
      place: 'T20',
      date: '29.05.2023',
    },
  ])

  function setCurrentUser(user: User) {
    currentUser.value = user
  }

  return {
    currentPage,
    changePage,
    currentUser,
    setCurrentUser,

    reports,
  }
})
