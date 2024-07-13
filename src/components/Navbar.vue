<template>
    <nav class="navbar bg-dark text-light navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li>
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li>
              <RouterLink to="/request-list" class="nav-link">All requests</RouterLink>
            </li>
            <li>
              <RouterLink to="/new-request" class="nav-link">New Request</RouterLink>
            </li>
            <li
            >
              <RouterLink to="/edit-request/:id" class="nav-link">Edit Request</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>