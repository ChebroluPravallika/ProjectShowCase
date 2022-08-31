import './index.css'

const ProjectItem = props => {
  const {item} = props
  return (
    <li className="projectItemContainer">
      <img
        src={item.imageUrl}
        style={{borderRadius: '15px', height: '180px'}}
        alt={item.name}
      />
      <p className="para">{item.name}</p>
    </li>
  )
}
export default ProjectItem
