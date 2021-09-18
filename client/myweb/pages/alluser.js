import { gql, useQuery } from "@apollo/client";

const ALL_USER_QUERY = gql`
query allUserQuery {
    allUser{
      id
      username
    }
  }
`;

const AllUser = () => {

    const { data, loading, error } = useQuery(ALL_USER_QUERY);

    if(loading) return <div>loading...</div>
    if(error) return <p>Error :(</p>

    const { allUser } = data;

    console.log(allUser);
    
    return (
        <div>
            {
                allUser.map( ({id, username}) => (
                    <div key={id}>
                        username: {username}
                    </div>
                ))
            }
        </div>
    );
};

export default AllUser;