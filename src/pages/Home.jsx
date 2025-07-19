import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div>

      {/* Banner Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to PNINFOSYS</h1>
          <p className="lead">
            Join industry-oriented tech courses and launch your career with confidence!
          </p>
          <a href="/courses" className="btn btn-light btn-lg mt-3">Explore Courses</a>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Popular Courses</h2>
          <div className="row">

            {/* Course Card 1 */}
            <div className="col-md-4">
              <div className="card shadow-sm">
                <img src="https://source.unsplash.com/400x250/?coding,programming" className="card-img-top" alt="Course 1" />
                <div className="card-body">
                  <h5 className="card-title">Full Stack Web Development</h5>
                  <p className="card-text">Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB in one course!</p>
                  <a href="/course/1" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="col-md-4">
              <div className="card shadow-sm">
                <img src="https://source.unsplash.com/400x250/?data,python" className="card-img-top" alt="Course 2" />
                <div className="card-body">
                  <h5 className="card-title">Data Science with Python</h5>
                  <p className="card-text">Master data analysis, visualization, pandas, and machine learning.</p>
                  <a href="/course/2" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="col-md-4">
              <div className="card shadow-sm">
                <img src="https://source.unsplash.com/400x250/?cloud,server" className="card-img-top" alt="Course 3" />
                <div className="card-body">
                  <h5 className="card-title">DevOps & Cloud</h5>
                  <p className="card-text">Understand CI/CD pipelines, Docker, Kubernetes, and AWS basics.</p>
                  <a href="/course/3" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Why Choose PNINFOSYS?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>Expert Trainers</h4>
                <p>Learn from industry professionals with real-world experience.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>Career Support</h4>
                <p>Resume building, mock interviews, and placement assistance.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>Project-Based Learning</h4>
                <p>Hands-on real projects to build your confidence and skills.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
