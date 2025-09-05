<% layout("/layouts/boilerplate") %>
<body>


    <form  method="POST" action="/listings" novalidate class="needs-validation">
        <div class="row">
            <div class="col-8 offset-2">
                <br>
            <h3>Create A New Listing</h3>
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input name="listing[title]" placeholder="enter title" type="text" class="form-control" required>
            <div class="valid-feedback">Title looks good</div>
            <div class="invalid-feedback">Please Enter A Valid Title</div>
            
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="listing[description]" class="form-control" required></textarea>
            <div class="invalid-feedback">Please Enter A Short Description</div>
        </div>
        
        <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input name="listing[image]" placeholder="Enter image url/link" type="text" class="form-control">
        </div>
        
        <div class="row">
            <div class="mb-3 col-md-4">
             <label for="price" class="form-label">Price</label>
             <input name="listing[price]" placeholder="1200"  class="form-control" required>
             <div class="invalid-feedback">Please Enter A Valid Price</div>
            </div>
        
            <div class="mb-3 col-md-8">
             <label for="country" class="form-label">Country</label>
             <input name="listing[country]" placeholder="enter country" type="text" class="form-control" required>
             <div class="invalid-feedback">Please Enter the Country Name</div>
             
            </div>
        </div>
       
        
        <div class="mb-3">
             <label for="location" class="form-label">Location</label>
             <input name="listing[location]" placeholder="enter location" type="text" class="form-control" required>
             <div class="invalid-feedback">Please Enter the Location   </div>
        </div>
        
        <button class="btn btn-dark add-btn mt-3">Add</button>
        
        
    </form>
    </div>
</div>
