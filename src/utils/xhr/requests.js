const requests = {
  cost: {
    store: {
      method: 'POST',
      url: '/admin/cost',
      showErrorSnackbar: true,
      showSucessSnackbar: true,
    },
    update: {
      method: 'PUT',
      url: '/admin/cost/:id',
      showErrorSnackbar: true,
      showSucessSnackbar: true,
    },
    destroy: {
      method: 'DELETE',
      url: '/admin/cost/:id',
      showErrorSnackbar: true,
      showSucessSnackbar: true,
    },
  },
  statistics: {
    summary: {
      method: 'GET',
      url: '/admin/summary',
      showErrorSnackbar: true,
    },
  },
  news: {
    index: {
      method: 'GET',
      url: '/news',
      showErrorSnackbar: true,
      queryParams: {
        withTimestamps: true,
      },
    },
    store: {
      method: 'POST',
      url: '/admin/news',
      showErrorSnackbar: true,
    },
    update: {
      method: 'PUT',
      url: '/admin/news/:id',
      showErrorSnackbar: true,
    },
    destroy: {
      method: 'DELETE',
      url: '/admin/news/:id',
      showErrorSnackbar: true,
    },
  },
};

export default requests;
