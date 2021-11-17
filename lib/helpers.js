export const handleChecked = (toCheck, setChecked, setOpenSortable) => {
  switch (toCheck) {
    case 'mostComments':
      setChecked({
        mostUpvotes: false,
        leastUpvotes: false,
        mostComments: true,
        leastComments: false,
      })
      setOpenSortable(false)
      break
    case 'mostUpvotes':
      setChecked({
        mostUpvotes: true,
        leastUpvotes: false,
        mostComments: false,
        leastComments: false,
      })
      setOpenSortable(false)
      break
    case 'leastComments':
      setChecked({
        mostUpvotes: false,
        leastUpvotes: false,
        mostComments: false,
        leastComments: true,
      })
      setOpenSortable(false)
      break
    case 'leastUpvotes':
      setChecked({
        mostUpvotes: false,
        leastUpvotes: true,
        mostComments: false,
        leastComments: false,
      })
      setOpenSortable(false)
      break
    default:
      break
  }
}

export const handleSortBy = (type, setSortBy) => {
  switch (type) {
    case 'all':
      setSortBy({
        all: true,
        ui: false,
        ux: false,
        enhancement: false,
        bug: false,
        feature: false,
      })
      break
    case 'ui':
      setSortBy({
        all: false,
        ui: true,
        ux: false,
        enhancement: false,
        bug: false,
        feature: false,
      })
      break
    case 'ux':
      setSortBy({
        all: false,
        ui: false,
        ux: true,
        enhancement: false,
        bug: false,
        feature: false,
      })
      break
    case 'enhancement':
      setSortBy({
        all: false,
        ui: false,
        ux: false,
        enhancement: true,
        bug: false,
        feature: false,
      })
      break
    case 'bug':
      setSortBy({
        all: false,
        ui: false,
        ux: false,
        enhancement: false,
        bug: true,
        feature: false,
      })
      break
    case 'feature':
      setSortBy({
        all: false,
        ui: false,
        ux: false,
        enhancement: false,
        bug: false,
        feature: true,
      })
      break
    default:
      break
  }
}
