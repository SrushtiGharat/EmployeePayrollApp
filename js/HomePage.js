window.addEventListener('DOMContentLoaded',(event)=>
    {
        createInnerHTML();
    }
);

function createInnerHTML()
{
    const innerHTML =`
        <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Actions</th>
    </tr>
    <tr>
        <td><img class="profile" alt = "" src="../assets/profile-images/Ellipse -7.png"></td>
        <td>Srushti Gharat</td>
        <td>Female</td>
        <td>
            <div class="dept-label">Sales</div>
            <div class="dept-label">Finance</div>
        </td>
        <td>300000</td>
        <td>18 February 2020</td>
        <td>
            <img id="act" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="act" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
        </td>
    </tr>`;

    document.querySelector('#table').innerHTML = innerHTML;
}