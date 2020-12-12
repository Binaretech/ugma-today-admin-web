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
};

export default requests;
