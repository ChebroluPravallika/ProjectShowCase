import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProjectItem from '../ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Projects extends Component {
  state = {
    id: 'ALL',
    dataItems: [],
    isLoading: true,
    isFailure: false,
  }

  componentDidMount = () => {
    this.getProjectItems()
  }

  getProjectItems = async () => {
    const {id} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.projects.map(eachItem => ({
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      this.setState({dataItems: formattedData, isLoading: false})
    } else {
      this.setState({isFailure: true})
    }
  }

  ChangeOption = event => {
    this.setState({id: event.target.value, isLoading: true}, () => {
      this.getProjectItems()
    })
  }

  onClickRetry = () => {
    this.getProjectItems()
  }

  render() {
    const {dataItems, isLoading, isFailure} = this.state
    console.log('hi', dataItems)

    return (
      <div>
        <div style={{backgroundColor: '#e2e8f0', padding: '10px'}}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            style={{height: '60px', paddingLeft: '45px'}}
          />
        </div>
        <div style={{padding: '5%'}}>
          <select
            onChange={this.ChangeOption}
            style={{height: '40px', width: '300px'}}
          >
            {categoriesList.map(each => (
              <option value={each.id} key={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          {isFailure && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
                alt="failure view"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button type="button" onClick={this.onClickRetry}>
                Retry
              </button>
            </div>
          )}
          {!isFailure && (
            <div>
              {!isLoading && (
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingTop: '20px',
                  }}
                >
                  {dataItems.map(item => (
                    <ProjectItem item={item} key={item.id} />
                  ))}
                </ul>
              )}
              {isLoading && (
                <div
                  testid="loader"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={50}
                    width={50}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Projects
