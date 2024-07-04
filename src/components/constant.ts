export const PAGE_SIZE_OPTIONS = [5, 10, 20];

export const COLUMN_WIDTHS = {
  default: 200,
  expanded: 250,
  actions: 140
};

export const THEME = {
  palette: {
    primary: {
      main: '#1976D2',
      contrastText: '#fff'
    },
    mode: 'light'
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeaderTitleContainer: ({ theme }) => ({
          '&.MuiDataGrid-columnHeaderTitleContainer--withBackground': {
            color: theme.palette.primary.contrastText
          },
          '&.MuiDataGrid-columnHeaderTitleContainer--withBackground.dark': {
            color: '#ccc'
          }
        })
      }
    }
  }
};
